import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
    return(
        <div class="spinner d-flex justify-content-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden" size="lg">Loading...</span>
            </Spinner>
        </div>
        
    );
}