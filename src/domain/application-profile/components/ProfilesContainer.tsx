import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import UnexpectedErrorMessage from "../../../application/components/common/UnexpectedErrorMessage"
import { AppState } from "../../../application/store"
import { getDefaultProfileAction, getProfilesAction } from "../store/Actions"
import NewProfileModal from "./NewProfileModal"
import AbsencesContainer from "../../working-time/components/absences/AbsencesContainer"
import FullPageLoader from "../../../application/components/common/FullPageLoader"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const ProfilesContainer: React.FC<Props> = ({
    profilesResult,
    getAvailableProfiles,
    getDefaultProfile,
    defaultProfileResult,
}) => {
    useEffect(() => {
        if (profilesResult.status === "NOT_STARTED" || profilesResult.status === "FAILED") {
            getAvailableProfiles()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (defaultProfileResult.status === "NOT_STARTED" || profilesResult.status === "FAILED") {
            getDefaultProfile()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (defaultProfileResult.status === "PENDING") {
        return <FullPageLoader text="Wczytywanie profilu" />
    }
    if (profilesResult.status === "FINISHED" && Object.keys(profilesResult.data).length < 1) {
        return <NewProfileModal isOpen={true} onClose={() => undefined} canClose={false} />
    } else if (profilesResult.status === "FINISHED") {
        const defaultProfile = defaultProfileResult.status === "FINISHED" ? defaultProfileResult.data : null
        const selectedProfile = defaultProfile
            ? Object.values(profilesResult.data).find((p) => p.profileName === defaultProfile)
            : undefined
        return (
            <AbsencesContainer
                profile={selectedProfile ?? Object.values(profilesResult.data)[0]}
                profiles={profilesResult.data}
            />
        )
    } else if (profilesResult.status === "FAILED") {
        return <UnexpectedErrorMessage error={profilesResult.error} />
    } else {
        return <FullPageLoader text="Wczytywanie profilu" />
    }
}

const mapStateToProps = (state: AppState) => ({
    profilesResult: state.profile.availableProfiles,
    defaultProfileResult: state.profile.defaultProfile,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAvailableProfiles: () => dispatch(getProfilesAction.started()),
    getDefaultProfile: () => dispatch(getDefaultProfileAction.started()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesContainer)
