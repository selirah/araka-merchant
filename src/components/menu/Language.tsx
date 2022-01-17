import React from 'react'
import { useTranslation } from 'react-i18next'

interface LanguageProps {}

export const Language: React.FC<LanguageProps> = () => {
  const { i18n } = useTranslation()

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="language">
      <i
        className="flag-icon flag-icon-gb"
        onClick={() => onChangeLanguage('en')}
      ></i>
      <i
        className="flag-icon flag-icon-fr"
        onClick={() => onChangeLanguage('fr')}
      ></i>
    </div>
  )
}
