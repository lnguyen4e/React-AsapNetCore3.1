import { observable,action, runInAction } from 'mobx';
import agent from '../api/agent';
import { IProfile } from '../models/profile';
import {RootStore} from './rootStore';
export default class ProfileStore {
    rootStore:RootStore
    constructor(rootStore:RootStore){
        this.rootStore=rootStore;
    }
    @observable profile:IProfile | null = null;
    @observable loadingProfile = true;

    @action loadProfile = async (username:string)=>{
        this.loadingProfile = true;
        try{
            const profile= await agent.Profiles.get(username);
            runInAction(()=>{
                this.profile= profile;
                this.loadingProfile=false
            })
        }
        catch(error){
            runInAction(()=>{
                this.loadingProfile= false;
            })
            console.log(error);
        }
    }
}