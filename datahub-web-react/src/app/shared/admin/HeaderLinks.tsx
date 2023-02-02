import styled from 'styled-components';
import * as React from 'react';
import {
    ApiOutlined,
    BarChartOutlined,
    BookOutlined,
    SettingOutlined,
    FolderOutlined,
    SolutionOutlined,
    DownOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import { useAppConfig } from '../../useAppConfig';
import { useGetAuthenticatedUser } from '../../useGetAuthenticatedUser';
import { ANTD_GRAY } from '../../entity/shared/constants';

const LinkWrapper = styled.span`
    margin-right: 0px;
`;

const LinksWrapper = styled.div<{ areLinksHidden?: boolean }>`
    opacity: 1;
    white-space: nowrap;
    transition: opacity 0.5s;

    ${(props) =>
        props.areLinksHidden &&
        `
        opacity: 0;
        width: 0;
    `}
`;

const MenuItem = styled(Menu.Item)`
    font-size: 12px;
    font-weight: bold;
    max-width: 240px;
`;

const NavTitleContainer = styled.span`
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 2px;
`;

const NavTitleText = styled.span`
    margin-left: 6px;
`;

const NavTitleDescription = styled.div`
    font-size: 12px;
    font-weight: normal;
    color: ${ANTD_GRAY[7]};
`;

interface Props {
    areLinksHidden?: boolean;
}

export function HeaderLinks(props: Props) {
    const { areLinksHidden } = props;
    const me = useGetAuthenticatedUser();
    const { config } = useAppConfig();

    const isAnalyticsEnabled = config?.analyticsConfig.enabled;
    const isIngestionEnabled = config?.managedIngestionConfig.enabled;

    const showAnalytics = (isAnalyticsEnabled && me && me.platformPrivileges.viewAnalytics) || false;
    const showSettings = true;
    const showIngestion =
        isIngestionEnabled && me && me.platformPrivileges.manageIngestion && me.platformPrivileges.manageSecrets;
    const showDomains = me?.platformPrivileges.createDomains || me?.platformPrivileges.manageDomains;
    const showASD = true;
    const root = '/';
    const cipEnv = window?.location?.hostname?.split('.')[0] || root;
    const ASDUrl = cipEnv.startsWith('cip-') ? `https://search-${cipEnv}.tax.service.gov.uk` : root;

    return (
        <LinksWrapper areLinksHidden={areLinksHidden}>
            {showASD && (
                <a href={ASDUrl}>
                    <Button type="text">Go to Advanced Search and Dashboards</Button>
                </a>
            )}
            {showAnalytics && (
                <LinkWrapper>
                    <Link to="/data-catalogue/analytics">
                        <Button type="text">
                            <Tooltip title="View DataHub usage analytics">
                                <NavTitleContainer>
                                    <BarChartOutlined />
                                    <NavTitleText>Analytics</NavTitleText>
                                </NavTitleContainer>
                            </Tooltip>
                        </Button>
                    </Link>
                </LinkWrapper>
            )}
            {showIngestion && (
                <LinkWrapper>
                    <Link to="/data-catalogue/ingestion">
                        <Button type="text">
                            <Tooltip title="Connect DataHub to your organization's data sources">
                                <NavTitleContainer>
                                    <ApiOutlined />
                                    <NavTitleText>Ingestion</NavTitleText>
                                </NavTitleContainer>
                            </Tooltip>
                        </Button>
                    </Link>
                </LinkWrapper>
            )}
            <Dropdown
                trigger={['click']}
                overlay={
                    <Menu>
                        <MenuItem key="0">
                            <Link to="/data-catalogue/glossary">
                                <NavTitleContainer>
                                    <BookOutlined style={{ fontSize: '14px', fontWeight: 'bold' }} />
                                    <NavTitleText>Glossary</NavTitleText>
                                </NavTitleContainer>
                                <NavTitleDescription>View and modify your data dictionary</NavTitleDescription>
                            </Link>
                        </MenuItem>
                        {showDomains && (
                            <MenuItem key="1">
                                <Link to="/data-catalogue/domains">
                                    <NavTitleContainer>
                                        <FolderOutlined style={{ fontSize: '14px', fontWeight: 'bold' }} />
                                        <NavTitleText>Domains</NavTitleText>
                                    </NavTitleContainer>
                                    <NavTitleDescription>Manage related groups of data assets</NavTitleDescription>
                                </Link>
                            </MenuItem>
                        )}
                    </Menu>
                }
            >
                <LinkWrapper>
                    <Button type="text">
                        <SolutionOutlined /> Govern <DownOutlined style={{ fontSize: '6px' }} />
                    </Button>
                </LinkWrapper>
            </Dropdown>
            {showSettings && (
                <LinkWrapper style={{ marginRight: 12 }}>
                    <Link to="/data-catalogue/settings">
                        <Button type="text">
                            <Tooltip title="Manage your DataHub settings">
                                <SettingOutlined />
                            </Tooltip>
                        </Button>
                    </Link>
                </LinkWrapper>
            )}
        </LinksWrapper>
    );
}
