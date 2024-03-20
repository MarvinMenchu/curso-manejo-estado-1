import React from "react"

const SECURITY_CODE = "paradigma"

function UseReducer({ name }) {

    const [state, dispatch] = React.useReducer(reducer, initialState)

    // const onConfirm = () => {
    //     setState({
    //         ...state,
    //         error: false,
    //         loading: false,
    //         confirmed: true
    //     })
    // }

    // const onError = () => {
    //     setState({
    //         ...state,
    //         error: true,
    //         loading: false
    //     })
    // }

    // // const onWrite = (newValue) => {
    // //     setState({
    // //         ...state,
    // //         value: newValue
    // //     })
    // // }

    // const onCheck = () => {
    //     setState({
    //         ...state,
    //         loading: true
    //     })
    // }

    // const onDelete = () => {
    //     setState({
    //         ...state,
    //         deleted: true
    //     })
    // }

    // const onReset = () => {
    //     setState({
    //         ...state,
    //         confirmed: false,
    //         deleted: false,
    //         value: ""
    //     })
    // }

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
                    dispatch({
                        type: "CONFIRM"
                    })
                    //setLoading(false)
                } else {
                    dispatch({
                        type: "ERROR"
                    })
                    // setError(true)
                    // setLoading(false)
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
                    onChange={(event) => {
                        //setError(false)
                        //onWrite(event.target.value)
                        //setValue(event.target.value)
                        dispatch({
                            type: "WRITE",
                            payload: event.target.value
                        })
                    }}
                />
                <button
                    onClick={() => {
                        //setError(false) // ESTE FUE
                        //onCheck()
                        //setLoading(!loading)
                        dispatch({
                            type: "CHECK"
                        })
                    }}
                >Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <>
                <p>Pedimos confirmación. Estas seguro?</p>
                <button
                    onClick={() => {
                        dispatch({
                            type: "DELETE"
                        })
                    }}
                >Sí, eliminar</button>
                <button
                    onClick={() => {
                        dispatch({
                            type: "RESET"
                        })
                    }}
                >No, me arrepentí</button>
            </>
        )

    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {
                        // onReset()
                        dispatch({
                            type: "RESET"
                        })
                    }}
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


// usando objeto
const reducerObject = (state, payload) => ({
    "ERROR": {
        ...state,
        error: true,
        loading: false
    },
    WRITE: {
        ...state,
        value: payload
    },
    "CHECK": {
        ...state,
        loading: true
    },
    "CONFIRM": {
        ...state,
        loading: false,
        error: false,
        confirmed: true
    },
    "DELETE": {
        ...state,
        deleted: true
    },
    "RESET": {
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