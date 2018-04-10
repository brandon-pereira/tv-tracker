import React from 'react';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class ActionBox extends React.Component {

    render() {
        const styles = {
            display: this.props.isVisible ? 'block' : 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,.5)',
            background: '#eee',
            position: 'relative'
        };
        return (
            <Card style={styles}>
                <CardHeader
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                />
                <CardActions>
                    <RaisedButton label={this.props.primaryButtonText} primary={true} onClick={this.props.onPrimaryClick} />
                    <FlatButton label={this.props.secondaryButtonText} onClick={this.props.onSecondaryClick} />
                </CardActions>
            </Card>
        )
    }
}