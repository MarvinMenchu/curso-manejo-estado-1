import React from "react"

const SECURITY_CODE = "paradigma"

function UseState({ name }) {

    const [state, setState] = React.useState({
        value: "",
        error: false,
        loading: false
    })

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
                    setState({
                        ...state,
                        error: false,
                        loading: false
                    })
                    //setLoading(false)
                } else {
                    setState({
                        ...state,
                        error: true,
                        loading: false
                    })
                    // setError(true)
                    // setLoading(false)
                
                }
                
                console.log('Terminando la validación')
            }, 3000)
        }
        console.log('Terminando el Efecto')
    }, [state.loading])

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
                    setState({
                        ...state,
                        value: event.target.value
                    })
                    //setValue(event.target.value)
                }}
            />
            <button
                onClick={() => {
                    //setError(false) // ESTE FUE
                    setState({
                        ...state,
                        loading: true
                    })
                    //setLoading(!loading)
                }}
            >Comprobar</button>
        </div>
    )
}

export { UseState }