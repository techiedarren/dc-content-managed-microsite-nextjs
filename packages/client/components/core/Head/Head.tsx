import React, { FC } from 'react'
import NextHead from 'next/head'

const Head: FC = () => {
    return (
        <>
            <NextHead>
                <meta charSet="utf8" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <title>ANYA FINN</title>
            </NextHead>
        </>
    )
}

export default Head;