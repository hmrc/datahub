import * as React from 'react';
import { PhaseBanner, TopNav } from 'govuk-react';
import styled from 'styled-components';
import { MAINSTREAM_BRAND } from 'govuk-colours';
import { ANTD_GRAY } from '../entity/shared/constants';

export const FixedCIPHeader = styled.header`
    position: fixed;
    z-index: 10;
    width: 100%;
    borderbottom: 1px solid ${ANTD_GRAY[4.5]};
    background: white;
`;

const CIPBannerBoundary = styled.div`
    width: 100%;
    padding-left: 5px;
    padding-right: 5px;
`;
const CurrentServiceHeader = styled.a`
    color: ${MAINSTREAM_BRAND};
    font-weight: 700;
`;

const root = '/';
const cipEnv = window?.location?.hostname?.split('.')[0] || root;
const ASDUrl = cipEnv.startsWith('cip-') ? `https://search-${cipEnv}.tax.service.gov.uk` : root;
const SearchURL = cipEnv.startsWith('cip-')
    ? `https://${cipEnv}.tax.service.gov.uk/txm-digital-persona/`
    : '/txm-digital-persona/';
const DataExplorationUrl = cipEnv.startsWith('cip-')
    ? `https://${cipEnv}.tax.service.gov.uk/data-catalogue`
    : `/data-catalogue`;
const ServicePageUrl = cipEnv.startsWith('cip-') ? `https://${cipEnv}.tax.service.gov.uk` : root;

const NavLinks = Array(<TopNav.Anchor href={SearchURL}>Search</TopNav.Anchor>);
NavLinks.push(<TopNav.Anchor href={ASDUrl}>Dashboards</TopNav.Anchor>);
NavLinks.push(<CurrentServiceHeader href={DataExplorationUrl}>Data Exploration</CurrentServiceHeader>);
const serviceLink = <TopNav.Anchor href={ServicePageUrl}>Customer Insight Platform</TopNav.Anchor>;

export const CIPBanner = () => {
    return (
        <>
            <TopNav serviceTitle={serviceLink}>{NavLinks}</TopNav>
            <CIPBannerBoundary>
                <PhaseBanner level="beta">
                    This is a new service – your
                    <a href="mailto: cipsupport@hmrc.gov.uk"> feedback</a> will help us to improve it.
                </PhaseBanner>
            </CIPBannerBoundary>
        </>
    );
};
