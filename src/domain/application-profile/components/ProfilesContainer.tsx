import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import UnexpectedErrorMessage from "../../../application/components/common/UnexpectedErrorMessage"
import { AppState } from "../../../application/store"
import { getProfilesAction } from "../store/Actions"
import NewProfileModal from "./NewProfileModal"
import AbsencesContainer from "../../working-time/components/absences/AbsencesContainer"
import FullPageLoader from "../../../application/components/common/FullPageLoader"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const ProfilesContainer: React.FC<Props> = ({ profilesResult, getAvailableProfiles }) => {
    useEffect(() => {
        if (profilesResult.status === "NOT_STARTED" || profilesResult.status === "FAILED") {
            getAvailableProfiles()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (profilesResult.status === "FINISHED" && Object.keys(profilesResult.data).length < 1) {
        return <NewProfileModal isOpen={true} onClose={() => undefined} canClose={false} />
    } else if (profilesResult.status === "FINISHED") {
        const selectedProfile = Object.values(profilesResult.data)[0] //TODO: it should be possible to select profile
        return <AbsencesContainer profile={selectedProfile} />
    } else if (profilesResult.status === "FAILED") {
        return <UnexpectedErrorMessage error={profilesResult.error} />
    } else {
        return <FullPageLoader text="Wczytywanie profilu" />
    }
}

const mapStateToProps = (state: AppState) => ({
    profilesResult: state.profile.availableProfiles,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAvailableProfiles: () => dispatch(getProfilesAction.started()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesContainer)
