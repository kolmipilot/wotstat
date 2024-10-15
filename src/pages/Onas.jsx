import React from "react";
import Navbar from "../Components/Navbar";
import Aboutus from "../Components/Aboutus";

const Onas = () => {
    return (
        <div className="h-screen overflow-hidden"> {/* Ustawia wysokość na pełen ekran i ukrywa przewijanie */}
            <Navbar />
            <Aboutus />
        </div>
    );
}

export default Onas;
