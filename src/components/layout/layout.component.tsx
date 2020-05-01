import React, { FC, useState, createContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useMediaQuery from 'ustudio-ui/hooks/use-media-query';
import Flex from 'ustudio-ui/components/Flex';

import logo from '../../assets/images/logo.svg';

import { Aside } from '../aside';

import Styled from './layout.styles';

import { name, repo } from '../../../config.json';

export const DrawerState = createContext(() => {});

export const Layout: FC = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { pathname } = useLocation();

  const isDocPage = pathname.includes(repo.docsFolder);

  const isMd = useMediaQuery('screen and (min-width: 768px)');

  return (
    <DrawerState.Provider value={() => setDrawerOpen(false)}>
      <Styled.Layout>
        <Styled.Header>
          <Styled.LogoLink to="/">
            <Styled.LogoImage src={logo} alt={`${name} Logo`} />
            <Styled.LogoText>{name}</Styled.LogoText>
          </Styled.LogoLink>

          <Styled.Nav>
            <Link to="/docs">Docs</Link>

            <a href={`https://github.com/${repo.owner}/${repo.name}`} target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </Styled.Nav>

          {!isMd && isDocPage && <Styled.DrawerButton isDrawerOpen={isDrawerOpen} onClick={() => setDrawerOpen(!isDrawerOpen)} />}
        </Styled.Header>

        <Styled.Main isDocPage={isDocPage}>
          {isDocPage && <Aside isMd={isMd} setDrawerOpen={setDrawerOpen} isDrawerOpen={isDrawerOpen} />}

          <Flex padding={{ left: 'large', right: 'large' }}>{children}</Flex>
        </Styled.Main>

        <Styled.Footer>
          © 2020{' '}
          <a href="https://ustudio.company" target="_blank" rel="noreferrer noopener">
            uStudio LLC
          </a>{' '}
          ❤️
        </Styled.Footer>
      </Styled.Layout>
    </DrawerState.Provider>
  );
};
