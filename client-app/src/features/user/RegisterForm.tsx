import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react'
import {Form as FinalForm, Field} from 'react-final-form';
import { Button, Form, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';
import {combineValidators,isRequired} from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
export const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {register} = rootStore.userStore;
    return (
       <FinalForm 
       onSubmit={(values: IUserFormValues)=> register(values).catch(error=>({
        [FORM_ERROR]: error

       }))}
    //    validate={validate}
       render={({handleSubmit,submitting,submitError,invalid,pristine,dirtySinceLastSubmit})=>(
        <Form onSubmit={handleSubmit} error>
            <Header as='h2' content ='Sign up to Reactivities' color='teal' textAlign='center'/>
            <Field name='username'
                component={TextInput}
                placeholder = 'Username'
            />
            <Field name='displayName'
                component={TextInput}
                placeholder = 'Display Name'
            />
            <Field name='email'
                component={TextInput}
                placeholder = 'Email'
            />
               <Field name='password'
                component={TextInput}
                placeholder = 'Password'
                type = 'password'
            />
            {submitError && !dirtySinceLastSubmit && (<ErrorMessage error ={submitError} />)}
            <Button disabled={invalid && !dirtySinceLastSubmit || pristine } loading={submitting} content='Register' fluid color='teal'/>
        </Form>

       )}
       />
    )
}
