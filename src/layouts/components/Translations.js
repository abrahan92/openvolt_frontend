import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

const Translations = ({ text }) => {
  const { t } = useTranslation()

  return <Fragment>{`${t(text)}`}</Fragment>
}

export default Translations
