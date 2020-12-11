import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react'
import {Form as FinalForm, Field} from 'react-final-form';
import { Button, Form, Header, Label } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';
import {combineValidators,isRequired} from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
const validate = combineValidators({
    email: isRequired('email'),
    password : isRequired('password')
})
export const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;
    return (
       <FinalForm 
       onSubmit={(values: IUserFormValues)=> login(values).catch(error=>({
        [FORM_ERROR]: error

       }))}
       validate={validate}
       render={({handleSubmit,submitting,submitError,invalid,pristine,dirtySinceLastSubmit})=>(
        <Form onSubmit={handleSubmit} error>
            <Header as='h2' content ='Login to Reactivities' color='teal' textAlign='center'/>
            <Field name='email'
                component={TextInput}
                placeholder = 'Email'
            />
               <Field name='password'
                component={TextInput}
                placeholder = 'Password'
                type = 'password'
            />
            {submitError && !dirtySinceLastSubmit && (<ErrorMessage error ={submitError} text='Invalid email or password'/>)}
            <Button disabled={invalid && !dirtySinceLastSubmit || pristine } loading={submitting} content='Login' fluid color='teal'/>
        </Form>

       )}
       />
    )
}
