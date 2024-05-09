import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
    { code: "et", lang: "Eesti keel" },
    { code: "en", lang: "English" }
]

const LanguaageSelector = () => {

    const { i18n } = useTranslation();

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
    }

    return (
        <div className="language-container">
            {languages.map((lng) => {
                return (
                    <div key={lng.code} className={`language-button ${lng.code === i18n.language ? "language-button-selected" : ""}`} onClick={() => changeLanguage(lng.code)}>
                        {lng.lang}
                    </div>
                )
            })}
        </div>
    )
}

export default LanguaageSelector;