import React from 'react';
import {Helmet} from 'react-helmet';
import {useSelector} from "react-redux";

const TabTitle = (props) => {
    const { title } = props;
    const {frontSetting} = useSelector(state => state)
    const companyName = frontSetting?.value?.company_name || frontSetting?.company_name || '';

    return (
        <Helmet>
            <title>{title}{companyName ? ` | ${companyName}` : ''}</title>
            {frontSetting && (frontSetting?.value?.logo || frontSetting?.logo) && (
                <link rel="icon" type="image/png" href={frontSetting?.value?.logo || frontSetting?.logo || "./../../../public/favicon.ico"} sizes="16x16" />
            )}
        </Helmet>
    )
}

export default TabTitle;
