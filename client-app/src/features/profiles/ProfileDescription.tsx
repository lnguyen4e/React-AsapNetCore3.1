import React, { useContext, useState } from 'react';
import { Tab, Header, Button, Grid } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import ProfileEditForm from './ProfileEditForm';
const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const { updateProfile, profile, isCurrentUser } = rootStore.profileStore;
  const [editMode, setEditMode] = useState(false);
    return (
        <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Edit Profile'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEditForm
            updateProfile={updateProfile}
            profile={profile!}
            />
          ) : (
           
              <span>{profile!.bio}</span>
           
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
    )
}

export default observer(ProfileDescription);
