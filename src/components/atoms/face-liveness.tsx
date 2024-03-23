"use client";
import React, {useEffect} from "react";
import {Loader, ThemeProvider} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import {
    FaceLivenessDetectorCore,
    AwsCredentialProvider,
} from "@aws-amplify/ui-react-liveness";
import {useState} from "react";


interface FaceLivenessSession {
    sessionId: string;
}



export default function FaceLiveness() {
    const [credentialProvider, setCredentialProvider] = useState<AwsCredentialProvider | null>(
        null,
    );
    const [loading, setLoading] = React.useState<boolean>(true);
    const [createLivenessApiData, setCreateLivenessApiData] = React.useState<FaceLivenessSession | null>(null);


    useEffect(() => {
        const getTemporaryCredentials = async () => {
            const response = await fetch(
                "http:localhost/api/v1/aws/face_liveness/credentials",
                {
                    method: "GET",
                    headers: {
                        "ngrok-skip-browser-warning": "1",
                    }
                }
            );
            const credentials = (await response.json()) as AwsCredentialProvider;
            setCredentialProvider(credentials);
        };

        const getFaceLivenessSession = async () => {
            const response = await fetch(
                "http:localhost/api/v1/aws/face_liveness/session",
                {
                    method: "GET",
                    headers: {
                        "ngrok-skip-browser-warning": "1",
                    }
                }
            );
            const session = (await response.json()) as FaceLivenessSession;
            setCreateLivenessApiData(session);
            setLoading(false)
        };


        void getTemporaryCredentials()
        void getFaceLivenessSession()
    }, []);


    const handleAnalysisComplete: () => Promise<void> = async () => {
        /*
         * This should be replaced with a real call to your own backend API
         */
        const response = await fetch(
            `http:localhost/api/v1/aws/face_liveness/result?session_id=${createLivenessApiData?.sessionId}`,
            {
                method: "GET",
                headers: {
                    "ngrok-skip-browser-warning": "1",
                }
            }
        );
        const data = await response.json();

        /*
         * Note: The isLive flag is not returned from the GetFaceLivenessSession API
         * This should be returned from your backend based on the score that you
         * get in response. Based on the return value of your API you can determine what to render next.
         * Any next steps from an authorization perspective should happen in your backend and you should not rely
         * on this value for any auth related decisions.
         */
        console.log(data);
        alert(`Confidence: ${data.Confidence}`)
    }


    return (
        <ThemeProvider>
            {loading || !credentialProvider || !createLivenessApiData ? (
                <Loader/>
            ) : (
                <FaceLivenessDetectorCore
                    sessionId={createLivenessApiData.sessionId}
                    region="ap-northeast-1"
                    onAnalysisComplete={handleAnalysisComplete}
                    onError={(error) => {
                        console.error(error);
                    }}
                    config={{credentialProvider}}
                />
            )}
            <p>{ !createLivenessApiData ? "walang laman" : "ok" }</p>
        </ThemeProvider>
    );
}
