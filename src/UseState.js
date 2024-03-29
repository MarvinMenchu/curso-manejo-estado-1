import React from "react"

const SECURITY_CODE = "paradigma"

function UseState({ name }) {

    const [state, setState] = React.useState({
        value: "",
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    })

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        })
    }

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true
        })
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: ""
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
                    onConfirm()
                    //setLoading(false)
                } else {
                    onError()
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
                        onWrite(event.target.value)
                        //setValue(event.target.value)
                    }}
                />
                <button
                    onClick={() => {
                        //setError(false) // ESTE FUE
                        onCheck()
                        //setLoading(!loading)
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
                        onDelete()
                    }}
                >Sí, eliminar</button>
                <button
                    onClick={() => {
                        onReset()
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
                        onReset()
                    }}
                >Resetear volver atrás</button>
            </>
        )
    }
}

export { UseState }