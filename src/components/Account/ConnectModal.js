import React, { useCallback } from 'react'
import {
  GU,
  Button,
  textStyle,
  Modal,
  useViewport,
  IconClose,
} from '@commonsswarm/ui'
import PropTypes from 'prop-types'
import { addEthereumChain } from '../../networks'
import { useWallet } from 'use-wallet'

const ConnectModal = ({ visible, id, provider, setOpenModal }) => {
  const { width } = useViewport()
  const wallet = useWallet()

  const activate = useCallback(
    async providerId => {
      try {
        await addEthereumChain()
        await wallet.activate(providerId)
      } catch (error) {
        console.error(error)
      }
    },
    [wallet]
  )
  const setClose = () => setOpenModal(false)

  return (
    <Modal
      closeButton={false}
      visible={visible}
      padding={7 * GU}
      width={Math.min(55 * GU, width - 40)}
    >
      <IconClose
        onClick={setClose}
        css={`
          display: flex;
          margin: auto;
          margin-right: 10px;
          margin-top: -20px;
          justify-content: flex-end;
          cursor: pointer;
        `}
      >
        Close
      </IconClose>
      <div
        css={`
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        `}
      >
        <h3
          css={`
            ${textStyle('title2')}
            margin-top: 24px;
            margin-bottom: 30px;
          `}
        >
          Hit Connect to connect with {provider.name}
        </h3>
        <ProviderButton
          onActivate={activate}
          id={id}
          provider={provider}
          setOpenModal={setOpenModal}
        >
          Connect
        </ProviderButton>
      </div>
    </Modal>
  )
}

const ProviderButton = ({ id, onActivate, setOpenModal }) => {
  const handleClick = useCallback(() => {
    onActivate(id)
    setOpenModal(false)
  }, [onActivate, id])

  return (
    <Button key={id} onClick={handleClick}>
      Connect
    </Button>
  )
}
ProviderButton.propTypes = {
  id: PropTypes.string.isRequired,
  onActivate: PropTypes.func.isRequired,
  provider: PropTypes.shape({}).isRequired,
}

export default ConnectModal
