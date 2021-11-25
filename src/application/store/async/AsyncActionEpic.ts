import { Deps } from "./../index"
import { StateObservable } from "redux-observable"
import { AppState } from ".."
import { Observable, ObservableInput, from } from "rxjs"
import { catchError } from "rxjs/operators"
import { filter } from "rxjs/operators"
import { map } from "rxjs/operators"
import { mergeMap } from "rxjs/operators"
import { AnyAction, AsyncActionCreators } from "typescript-fsa"

export const createEpic = <Params, Result, Error, Dependencies = Deps>(
    asyncActions: AsyncActionCreators<Params, Result, Error>,
    requestCreator: (params: Params, dependencies: Dependencies, state: AppState) => ObservableInput<Result>
) => {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return (actions$: Observable<AnyAction>, state$: StateObservable<AppState>, deps: Dependencies) =>
        actions$.pipe(
            filter(asyncActions.started.match),
            mergeMap((action) =>
                from(requestCreator(action.payload, deps, state$.value)).pipe(
                    map((resp) => asyncActions.done({ result: resp, params: action.payload })),
                    catchError((err: Error) => {
                        if (process.env?.NODE_ENV === "development") {
                            console.error(err)
                        }
                        return [asyncActions.failed({ params: action.payload, error: err })]
                    })
                )
            )
        )
}
