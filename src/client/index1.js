import React from 'react'
import { hydrate } from 'react-dom'
import Menu from '../common/components/Menu'

window.React = React

alert('bundle loaded, hydrating browser')

hydrate(
    <Menu recipes={__DATA__} />,
    document.getElementById("react-container")
)

alert('render complete')