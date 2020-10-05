import * as React from 'react';
import { DefaultButton, IContextualMenuProps, Stack } from 'office-ui-fabric-react';

const PADDING: number = 5;

const Links: IContextualMenuProps = {
    items: [
        {
            key: "bing",
            text: "Bing",
            href: "https://bing.com",
            iconProps: { iconName: "BingLogo"}
        },
        {
            key: "office",
            text: "Office 365",
            href: "https://portal.office.com",
            iconProps: { iconName: "OfficeLogo"}
        }
    ]
}

const ExampleHeader = () => {
    return (
        <Stack padding={PADDING}>
            <Stack.Item align="end">
                <DefaultButton iconProps={{ iconName: "Link" }} menuProps={Links}>Links</DefaultButton>
            </Stack.Item>
        </Stack>
    )
}

export { ExampleHeader }