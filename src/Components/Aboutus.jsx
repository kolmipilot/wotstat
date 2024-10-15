import React from "react";

const Aboutus = () => {
    return (
        <section className="h-screen flex items-center justify-center"> {/* Ustawienie wysokości na pełen ekran */}
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto flex flex-col justify-center h-full"> {/* Pełna wysokość */}
                <div className="flex flex-col items-center gap-10 h-full justify-center"> {/* Ustawienie pełnej wysokości */}
                    <h2 className="text-gray-100 text-3xl font-normal leading-relaxed">O nas</h2>
                    <h2 className="text-indigo-200 text-4xl font-bold font-manrope leading-normal text-center">
                        WOTstats by kolmipilot
                    </h2>
                    <p className="text-gray-200 text-base font-normal leading-relaxed text-center">
                        Jest to prosta strona do sprawdzania statystyk gracza w wocie według nicku gracza. Nie jest ona zbyt zaawansowana, ponieważ jest to moja pierwsza strona w reactcie z wykorzystaniem jakiekolwiek api. Jednak mam nadzieję że spełnia swoją funkcje w obecynm stanie. W przyszłości będzie rozwijana, aby wyświetlać więcej informacji. Jeśli zauwazyliście jakiś błąd lub chcecie zaproponować zmianę wejdźcie w zakładkę kontakt.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Aboutus;
