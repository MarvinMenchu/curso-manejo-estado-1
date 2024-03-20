import React from "react"

const SECURITY_CODE = "paradigma"

function UseReducer({ name }) {

    const [state, dispatch] = React.useReducer(reducer, initialState)

    const onConfirm = () => dispatch({ type: actionTypes.confirm })

    const onError = () => {
        dispatch({
            type: actionTypes.error
        })
    }

    const onWrite = ({target: {value}}) => {
        dispatch({
            type: actionTypes.write,
            payload: value
        })
    }

    const onCheck = () => {
        dispatch({
            type: actionTypes.check
        })
    }

    const onDelete = () => {
        dispatch({
            type: actionTypes.delete
        })
    }

    const onReset = () => {
        dispatch({
            type: actionTypes.reset
        })
    }

    // const [value, setValue] = React.useState("")
    // const [error, setError] = React.useState(false)
    // const [loading, setLoading] = React.useState(false)

    console.log(state)

    React.useEffect(() => {
        console.log('Empezando el Efecto')
        if (!!state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación')

                if (state.value === SECURITY_CODE) {
                    // dispatch({
                    //     type: actionTypes.delete
                    // })
                    onConfirm()
                    //setLoading(false)
                } else {
                    // dispatch({
                    //     type: actionTypes.error
                    // })
                    // setError(true)
                    // setLoading(false)
                    onError()
                }
                console.log('Terminando la validación')
            }, 3000)
        }
        console.log('Terminando el Efecto')
    }, [state.loading])

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad</p>
                    {(state.error  && !state.loading) && (
                        <p>Error: el código es incorrecto</p>
                    )}
                    {state.loading && (
                        <p>Loading...</p>
                    )}
                <input placeholder="Código de seguridad" 
                    value={state.value}
                    // onChange={(event) => {
                    //     //setError(false)
                    //     onWrite(event.target.value)
                    //     //setValue(event.target.value)
                    //     // dispatch({
                    //     //     type: actionTypes.write,
                    //     //     payload: event.target.value
                    //     // })
                    // }}
                    onChange={onWrite}
                />
                <button
                    // onClick={() => {
                    //     //setError(false) // ESTE FUE
                    //     //onCheck()
                    //     //setLoading(!loading)
                    //     // dispatch({
                    //     //     type: actionTypes.check
                    //     // })
                    //     onCheck()
                    // }}
                    onClick={onCheck}
                >Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <>
                <p>Pedimos confirmación. Estas seguro?</p>
                <button
                    // onClick={() => {
                    //     // dispatch({
                    //     //     type: actionTypes.confirm
                    //     // })
                    //     onConfirm()
                    // }}
                    onClick={onDelete}
                >Sí, eliminar</button>
                <button
                    // onClick={() => {
                    //     // dispatch({
                    //     //     type: actionTypes.reset
                    //     // })
                    //     onReset()
                    // }}
                    onClick={onReset}
                >No, me arrepentí</button>
            </>
        )

    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button
                    // onClick={() => {
                    //     onReset()
                    //     // dispatch({
                    //     //     type: actionTypes.reset
                    //     // })
                    // }}
                    onClick={onReset}
                >Resetear volver atrás</button>
            </>
        )
    }
}

const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const actionTypes = {
    error: "ERROR",
    write: "WRITE",
    check: "CHECK",
    confirm: "CONFIRM",
    delete: "DELETE",
    reset: "RESET"
}


// usando objeto
const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
    [actionTypes.check]: {
        ...state,
        loading: true
    },
    [actionTypes.confirm] : {
        ...state,
        loading: false,
        error: false,
        confirmed: true
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ""
    },
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
}

export { UseReducer }



// const reducer = (state, action) => {

// }
// usando if
// const reducer = (state, action) => {
//     if (action.type === "ERROR") {
//         return {
//             ...state,
//             error: true,
//             loading: false
//         }
//     } else if (action.type === "CHECK") {
//         return {
//             ...state,
//             loading: true
//         }
//     } else {
//         return {
//             ...initialState
//         }
//     }
// }

// usando switch
// const reducerSwitch = (state, action) => {
//     switch(action.type) {
//         case "ERROR":
//             return {
//                 ...state,
//                 error: true,
//                 loading: false
//             }
//             break
//         case "CHECK":
//             return {
//                 ...state,
//                 loading: true
//             }
//             break
//             default:
//                 return {
//                     ...state
//                 }
//             break
        
//     }
// }