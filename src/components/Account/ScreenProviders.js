import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  ButtonBase,
  GU,
  Link,
  RADIUS,
  textStyle,
  useTheme,
} from '@commonsswarm/ui'
import { getProviderFromUseWalletId } from '../../ethereum-providers'
import { getUseWalletProviders } from '../../utils/web3-utils'

const PROVIDERS_INFO = getUseWalletProviders().map(provider => [
  provider.id,
  getProviderFromUseWalletId(provider.id),
])

const ScreenProviders = ({ openModal, setOpenModal, setId, setProvider }) => {
  const theme = useTheme()

  return (
    <div>
      <h4
        css={`
          padding-top: ${2 * GU}px;
          padding-left: ${2 * GU}px;
          ${textStyle('label2')};
          color: ${theme.contentSecondary};
          margin-bottom: ${2 * GU}px;
        `}
      >
        Ethereum providers
      </h4>
      <div
        css={`
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          padding: ${2 * GU}px ${2 * GU}px 0;
        `}
      >
        <div
          css={`
            display: grid;
            grid-gap: ${1.5 * GU}px;
            grid-auto-flow: row;
          `}
        >
          {PROVIDERS_INFO.map(([id, provider]) => (
            <ProviderButton
              key={id}
              id={id}
              provider={provider}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setId={setId}
              setProvider={setProvider}
            />
          ))}
        </div>
        <div
          css={`
            display: flex;
            justify-content: center;
            margin-top: ${2 * GU}px;
          `}
        >
          <Link
            href="https://ethereum.org/wallets/"
            css="text-decoration: none"
          >
            What is an Ethereum provider?
          </Link>
        </div>
      </div>
    </div>
  )
}

const ProviderButton = ({
  id,
  provider,
  openModal,
  setOpenModal,
  setId,
  setProvider,
}) => {
  const handleClick = useCallback(() => {
    setOpenModal(openModal => !openModal)
    setId(id)
    setProvider(provider)
  }, [])

  return (
    <ButtonBase
      key={id}
      onClick={handleClick}
      css={`
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: ${12 * GU}px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
        border-radius: ${RADIUS}px;
        &:active {
          top: 1px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}
    >
      <img src={provider.image} alt="" height={5.25 * GU} />
      <div
        css={`
          margin-top: ${1 * GU}px;
          ${textStyle('body1')};
        `}
      >
        {provider.name}
      </div>
    </ButtonBase>
  )
}
ProviderButton.propTypes = {
  id: PropTypes.string.isRequired,
  provider: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default ScreenProviders
