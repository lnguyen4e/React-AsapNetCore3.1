import React, { useContext, useState } from 'react';
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';
import { observer } from 'mobx-react-lite';

const ProfileDescription = () => {
    const rootStore = useContext(RootStoreContext);
    const {
      profile,
      isCurrentUser,
      uploadPhoto,
      uploadingPhoto,
      setMainPhoto,
      deletePhoto,
      loading
    } = rootStore.profileStore;
    const [EditMode, setEditMode] = useState(false);
    return (
        <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!EditMode)}
              floated='right'
              basic
              content={EditMode ? 'Cancel' : 'Edit Profile'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {EditMode ? (
            <PhotoUploadWidget
              uploadPhoto={handleUploadImage}
              loading={uploadingPhoto}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map(photo => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          onClick={e => {
                            setMainPhoto(photo)
                            setTarget(e.currentTarget.name);
                          }}
                          name={photo.id}
                          disabled={photo.isMain}
                          loading={loading && target === photo.id}
                          basic
                          positive
                          content='Main'
                        />
                        <Button
                          name={photo.id}
                          disabled={photo.isMain}
                          onClick={(e) => {
                            deletePhoto(photo)
                            setDeleteTarget(e.currentTarget.name)
                          }}
                          loading={loading && deleteTarget === photo.id}
                          basic
                          negative
                          icon='trash'
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
    )
}

export default ProfileDescription
