import React, { useState } from 'react';
import { Image, Layout } from 'antd';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import { SearchBar } from './SearchBar';
import { ManageAccount } from '../shared/ManageAccount';
import { AutoCompleteResultForEntity, EntityType } from '../../types.generated';
import EntityRegistry from '../entity/EntityRegistry';
import { ANTD_GRAY } from '../entity/shared/constants';
import { HeaderLinks } from '../shared/admin/HeaderLinks';
import { useAppConfig } from '../useAppConfig';
import { DEFAULT_APP_CONFIG } from '../../appConfigContext';
import { CIPBetaText } from '../shared/CIPShared';

const { Header } = Layout;

const styles = {
    header: {
        position: 'fixed',
        zIndex: 10,
        width: '100%',
        lineHeight: '20px',
        padding: '0px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${ANTD_GRAY[4.5]}`,
    },
};

const LogoImage = styled(Image)`
    display: inline-block;
    height: 32px;
    width: auto;
    margin-top: 2px;
`;

const LogoSearchContainer = styled.div`
    display: flex;
    flex: 1;
`;

const NavGroup = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    align-contenxt: space-between;
    justify-content: flex-end;
    min-width: 200px;
`;

type Props = {
    initialQuery: string;
    placeholderText: string;
    suggestions: Array<AutoCompleteResultForEntity>;
    onSearch: (query: string, type?: EntityType) => void;
    onQueryChange: (query: string) => void;
    authenticatedUserUrn: string;
    authenticatedUserPictureLink?: string | null;
    entityRegistry: EntityRegistry;
};

const defaultProps = {
    authenticatedUserPictureLink: undefined,
};

/**
 * A header containing a Logo, Search Bar view, & an account management dropdown.
 */
export const SearchHeader = ({
    initialQuery,
    placeholderText,
    suggestions,
    onSearch,
    onQueryChange,
    authenticatedUserUrn,
    authenticatedUserPictureLink,
    entityRegistry,
}: Props) => {
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
    const themeConfig = useTheme();

    return (
        <Header style={styles.header as any}>
            <CIPBetaText>BETA</CIPBetaText>
            <LogoSearchContainer>
                <Link to="/data-catalogue">
                    <LogoImage src={themeConfig.assets.logoUrl} preview={false} />
                </Link>
                <SearchBar
                    initialQuery={initialQuery}
                    placeholderText={placeholderText}
                    suggestions={suggestions}
                    onSearch={onSearch}
                    onQueryChange={onQueryChange}
                    entityRegistry={entityRegistry}
                    setIsSearchBarFocused={setIsSearchBarFocused}
                    fixAutoComplete
                />
            </LogoSearchContainer>
            <NavGroup>
                <HeaderLinks areLinksHidden={isSearchBarFocused} />
                <ManageAccount urn={authenticatedUserUrn} pictureLink={authenticatedUserPictureLink || ''} />
            </NavGroup>
        </Header>
    );
};

SearchHeader.defaultProps = defaultProps;
