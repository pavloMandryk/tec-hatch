import React from 'react'
import styled from 'styled-components'
import { Link, GU, textStyle, useLayout } from '@commonsswarm/ui'

const TECInfo = () => {
  const { layoutName } = useLayout()
  const codeOfConductUrl =
    'https://docs.google.com/document/d/1S5EoWbsFt3uQ5Wj6yyUJKyApFyjCQ-EloZAr6W55N3U/edit#'

  return (
    <div
      css={`
        display: flex;
        justify-content: center;
        align-items: ${layoutName === 'small' ? 'center' : 'flex-start'};
        flex-direction: column;
        padding: 0 ${GU};
      `}
    >
      <Title>To·ken En·gi·neer·ing /ˈtoʊkən/ /ˌendʒɪˈnɪərɪŋ/</Title>
      {/* Including list items directly because we don't want the left spacing
      provided by the <ol> tag element */}
      <Paragraph>
        1. An emerging engineering discipline focused on holistic systems design
        and the theory, practice and tools used to design and verify tokenized
        ecosystems i.e. cryptoeconomic systems and their simulation using tools
        like cadCAD.
      </Paragraph>
      <Paragraph>
        2. A discipline of responsibility; adhering to the highest principles of
        ethical conduct (from ethical engineering).
      </Paragraph>
      <Paragraph>
        3. A community pushing forward the field of token engineering in theory
        and practice. (See more Modeling Crypto Protocols as Complex Systems, TE
        Process).
      </Paragraph>
      <Title>Com·mons /ˈkɒmənz/</Title>
      <Paragraph>
        1. Resources that groups of people (communities, organizations) create
        and manage for individual and collective benefit. These resources are
        held collectively, not owned privately (see Fractar Ownership, Wiki and
        Automating Ostrom).
      </Paragraph>
      <Title>Vision &amp; Mission</Title>
      <Paragraph>
        A few co-creative sessions were held to identify the TEC Vision, Mission
        and Values using this Miro, followed by a-sync work and voting on the
        Discord Channel.
      </Paragraph>
      <Title>Values</Title>
      <Paragraph>
        The TEC operates from a prosocial human centered perspective. We hold
        ourselves to high standards of safety, resilience, and integrity. We
        encourage our members to be radically open source, non-hierarchical,
        creative, transparent in their intentions and accountable for their
        actions. We are value driven, (non profit driven) and will strive to
        support token engineering projects that appreciate the value of public
        goods and ethical, inclusive economic systems. (See also, the{' '}
        <Link href={codeOfConductUrl} target="_blank" rel="noreferrer">
          TEC Code of Conduct
        </Link>
        ).
      </Paragraph>
    </div>
  )
}

const Title = ({ children }) => {
  const { layoutName } = useLayout()

  return (
    <div
      css={`
        ${textStyle('title4')};
        align-self: flex-start;
        margin: ${2 * GU}px ${layoutName === 'small' ? 1.5 * GU : 0}px;
        font-weight: bold;
      `}
    >
      {children}
    </div>
  )
}

const Paragraph = styled.div`
  margin: ${1 * GU}px 0;
  width: ${({ layout }) => (layout === 'small' ? 100 : 90)}%;
  ${textStyle('body2')};
`
export default TECInfo
