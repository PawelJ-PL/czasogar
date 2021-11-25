import { Profile } from "./../types/Profile"
import actionCreatorFactory from "typescript-fsa"

const actionCreator = actionCreatorFactory("PROFILE")

export const getProfilesAction = actionCreator.async<void, Record<string, Profile>, Error>("GET_PROFILES")

export const addOrUpdateProfileAction = actionCreator.async<Profile, void, Error>("ADD_OR_UPDATE_PROFILE")

export const setDefaultProfileAction = actionCreator.async<string, void, Error>("SET_DEFAULT_PROFILE")

export const getDefaultProfileAction = actionCreator.async<void, string | null, Error>("GET_DEFAULT_PROFILE")
