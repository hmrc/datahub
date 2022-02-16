import styled from 'styled-components';
import * as React from 'react';
import {
    ApiOutlined,
    BankOutlined,
    BarChartOutlined,
    SettingOutlined,
    UsergroupAddOutlined,
    FolderOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useAppConfig } from '../../useAppConfig';
import { useGetAuthenticatedUser } from '../../useGetAuthenticatedUser';

const AdminLink = styled.span`
    margin-right: 4px;
`;

export function AdminHeaderLinks() {
    const me = useGetAuthenticatedUser();
    const { config } = useAppConfig();

    const isAnalyticsEnabled = config?.analyticsConfig.enabled;
    const isPoliciesEnabled = config?.policiesConfig.enabled;
    const isIdentityManagementEnabled = config?.identityManagementConfig.enabled;
    const isIngestionEnabled = config?.managedIngestionConfig.enabled;

    const showAnalytics = (isAnalyticsEnabled && me && me.platformPrivileges.viewAnalytics) || false;
    const showPolicyBuilder = (isPoliciesEnabled && me && me.platformPrivileges.managePolicies) || false;
    const showIdentityManagement =
        (isIdentityManagementEnabled && me && me.platformPrivileges.manageIdentities) || false;
    const showSettings = true;
    const showIngestion =
        isIngestionEnabled && me && me.platformPrivileges.manageIngestion && me.platformPrivileges.manageSecrets;
    const showDomains = me?.platformPrivileges?.manageDomains || false;
    const showASD = true;

    return (
        <>
            {showASD && (
                <AdminLink>
                    <Link to="/">
                        <Button type="text">Go to Advanced Search and Dashboards</Button>
                    </Link>
                </AdminLink>
            )}
            {showAnalytics && (
                <AdminLink>
                    <Link to="/data-catalogue/analytics">
                        <Button type="text">
                            <BarChartOutlined /> Analytics
                        </Button>
                    </Link>
                </AdminLink>
            )}
            {showPolicyBuilder && (
                <AdminLink>
                    <Link to="/data-catalogue/policies">
                        <Button type="text">
                            <BankOutlined /> Policies
                        </Button>
                    </Link>
                </AdminLink>
            )}
            {showDomains && (
                <AdminLink>
                    <Link to="/domains">
                        <Button type="text">
                            <FolderOutlined /> Domains
                        </Button>
                    </Link>
                </AdminLink>
            )}
            {showIdentityManagement && (
                <AdminLink>
                    <Link to="/data-catalogue/identities">
                        <Button type="text">
                            <UsergroupAddOutlined /> Users & Groups
                        </Button>
                    </Link>
                </AdminLink>
            )}
            {showIngestion && (
                <AdminLink>
                    <Link to="/ingestion">
                        <Button type="text">
                            <ApiOutlined /> Ingestion
                        </Button>
                    </Link>
                </AdminLink>
            )}
            {showSettings && (
                <AdminLink>
                    <Link to="/data-catalogue/settings">
                        <Button type="text">
                            <SettingOutlined /> Settings
                        </Button>
                    </Link>
                </AdminLink>
            )}
        </>
    );
}
