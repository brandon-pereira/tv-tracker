import React from 'react';
import { GridTile } from 'material-ui/GridList';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class FirstTvShow extends React.Component {

    onClick() {
        console.log("HERE");
        this.props.router.push('/add')
    }

    render() {
        const containerStyles = {
            background: '#333',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        };
        const addStyles = {
            color: '#fff',
            height: 150,
            width: 150,
        }
        return (
            <GridTile
                style={containerStyles}
                title="Add your first show!"
                subtitle="Or click the icon in the bottom right."
                onClick={() => this.onClick()}
            >
                <ContentAdd style={addStyles}/>
            </GridTile>
        )
    }

}