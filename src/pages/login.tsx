import React, { useState, FormEvent } from "react";
import { useFetch, ICON, InputElement, Loader } from "components";
import { login } from "store/slicers/authentication";
import { useDispatch } from "react-redux";
import "styles/login-page.scss";
import { Endpoints, validNumber } from "utils";


interface CallbackProps {
    stateInstance: "authorized" | "blocked" | "sleepMode" | "notAuthorized" | "starting";
}

export default function LoginPage() {
    const [id, setId] = useState<string>("");
    const [saveCredentials, setSaveCredentials] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const dispatch = useDispatch();
    const url = Endpoints.accountStatus({ id: parseInt(id), apiToken: token, isAuthenticated: false });
    const callback = (data: CallbackProps): void => {

        if (data.stateInstance === 'authorized') {
            dispatch(login({ id: parseInt(id), apiToken: token, saveCredentials }));
        } else {
            setMessage({ status: 500, message: `Error: account status (${data.stateInstance})` });
        }
        
    }
    const { message, loading, setMessage, setMethod, setUrl, setCallback } = useFetch({});
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (id.toString().trim().length >= 5 && token.trim().length > 5) {
            setUrl(url);
            setMethod('GET');
            setCallback(()=> callback);
        }
    }
    const clear = (): void => {
        setToken("");
        setId("");
    }

    return (<>
        <main className="loginPage">
            <div className="landing-header">
                <div className="landing-header__icon">
                    <span>
                        <ICON name="whatsapp-brands" color="white" class="icon55" />
                    </span>
                    <span>WHATSAPP WEB</span>
                </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} >
                {message ?
                    <div className="messages warning" onClick={() => setMessage(null)}>
                        {(message.message)}
                    </div>
                    : null}
                <div className='section'>
                    <InputElement
                        title="Id"
                        type={"password"}
                        placeholder="Your id"
                        maxLength={30}
                        minLength={6}
                        minHeight="35px"
                        disabled={loading}
                        required={true}
                        passwordToggle={true}
                        labelInnerText="ID"
                        value={id.toString()}
                        onInput={(value: string) => { validNumber({ value, setValue: setId }); setMessage(null) }}
                    />
                </div>
                <div className='section'>
                    <InputElement
                        title="Token"
                        type={"password"}
                        placeholder="Your token"
                        maxLength={150}
                        minHeight="35px"
                        minLength={6}
                        disabled={loading}
                        required={true}
                        labelInnerText="Token"
                        passwordToggle={true}
                        value={token}
                        onInput={(value: string) => { setToken(value); setMessage(null) }}
                    />
                </div>
                <div className="section">
                    <span>Save Credenitals</span>
                    <button className="saveCredentialsButton" type='button' onClick={() => setSaveCredentials(!saveCredentials)}>
                        {saveCredentials ?
                            <ICON name={"check-solid"} color="green"/>
                            : null}
                    </button>
                </div>
                <div className="buttons">
                    <button type="submit" disabled={loading} className="primary">
                        {loading ? <Loader $size={20} /> : "Login"}
                    </button>
                    <button type="button" disabled={loading} onClick={clear}>{("Cancel")}</button>
                </div>
            </form>
        </main>
    </>)
}
