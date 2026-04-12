import { useEffect, useRef, useState } from "react";
import { init } from "../utils/utils";
import { detect } from "../utils/utils";
import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";
import "../styles/faceExpression.scss";

export default function FaceExpression({onclick= ()=>{ }}) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Ready to detect");
    const [ isLoading, setIsLoading ] = useState(false);
    const [ emotionClass, setEmotionClass ] = useState("emotion-neutral");

    // Map emotions to CSS classes
    const emotionMap = {
        "Happy": "emotion-happy",
        "Sad": "emotion-sad",
        "Surprised": "emotion-surprised",
        "Angry": "emotion-angry",
        "Neutral": "emotion-neutral",
    };

    useEffect(() => {
        init({landmarkerRef, videoRef, streamRef});

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick(){
        setIsLoading(true);
        setExpression("Scanning...");
        try {
            const detectedExpression = await detect({ landmarkerRef, videoRef, setExpression });
            setEmotionClass(emotionMap[detectedExpression] || "emotion-neutral");
            onclick(detectedExpression);
        } catch (error) {
            console.error("Detection error:", error);
            setExpression("Detection error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={`face-expression-container ${emotionClass}`}>
            <div className="detection-area">
                <div className="video-container">
                    <div className="scanner-overlay"></div>
                    <video
                        ref={videoRef}
                        playsInline
                    />
                </div>

                <div className="aura-button-wrapper">
                    <button 
                        className={`aura-button ${isLoading ? 'loading' : ''}`}
                        onClick={handleClick}
                        disabled={isLoading}
                        aria-label="Detect expression"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M9 12l2 2 4-4"></path>
                        </svg>
                    </button>
                </div>

                <div className="expression-display">
                    <h2>{expression}</h2>
                    <p>Click the aura button to detect your current emotion</p>
                </div>
            </div>
        </div>
    );
}