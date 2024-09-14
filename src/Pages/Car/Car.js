import React from "react";
import { useParams } from "react-router-dom";
export default function Car() {
    const { vehicleId } = useParams();
    return (
        <div>
            {vehicleId}
            Car
        </div>
    )
 }