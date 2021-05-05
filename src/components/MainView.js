import React, { useState } from 'react'
import { ScrollView, SyncIndicator, Layout, useTheme } from '@commonsswarm/ui'
import { ThemeProvider as SCThemeProvider } from 'styled-components'

import Header from './Header/Header'

import { useAppState } from '../providers/AppState'
import ErrorModal from './ErrorModal'
import ConnectModal from './Account/ConnectModal'

const MainView = ({ children }) => {
  const theme = useTheme()
  const { isLoading, errors } = useAppState()
  const [openModal, setOpenModal] = useState(false)
  const [id, setId] = useState('')
  const [provider, setProvider] = useState('')

  return (
    <SCThemeProvider theme={theme}>
      <ScrollView>
        <div
          css={`
            display: flex;
            flex-direction: column;
            height: 100vh;
          `}
        >
          <div
            css={`
              flex-shrink: 0;
            `}
          >
            <Header
              openModal={openModal}
              setOpenModal={setOpenModal}
              id={id}
              setId={setId}
              provider={provider}
              setProvider={setProvider}
            />
          </div>
          <Layout>
            <SyncIndicator visible={isLoading} />
            <Layout>{!isLoading && children}</Layout>
            <ErrorModal visible={!!errors} />
            <ConnectModal
              visible={openModal}
              id={id}
              provider={provider}
              setOpenModal={setOpenModal}
            />
          </Layout>
        </div>
      </ScrollView>
    </SCThemeProvider>
  )
}

export default MainView
