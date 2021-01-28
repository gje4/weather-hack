import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  Card,
  CardTitle,
  CardBody,
  CardActions,
} from '@progress/kendo-react-layout'
import { DropDownList } from '@progress/kendo-react-dropdowns'

class App extends React.Component {
  state = {
    currentLayout: 'k-card-list',
  }
  handleOnChange = (e) => {
    this.setState({
      currentLayout: e.target.value,
    })
  }
  render() {
    return (
      <div>
        <p>Change the layout:</p>
        <DropDownList
          data={['k-card-list', 'k-card-group', 'k-card-deck']}
          value={this.state.currentLayout}
          onChange={this.handleOnChange}
        />
        <hr />
        <div className={this.state.currentLayout}>
          <Card style={{ width: 200 }}>
            <CardBody>
              <CardTitle>Card Title</CardTitle>
              <CardTitle>Card Subtitle</CardTitle>
              <p>
                Some quick example text to build on the card title and make up
                the bulk of the card content.
              </p>
            </CardBody>
            <CardActions>
              <span className="k-button k-flat k-primary">Action 1</span>
              <span className="k-button k-flat k-primary">Action 2</span>
            </CardActions>
          </Card>
          <Card style={{ width: 200 }}>
            <CardBody>
              <CardTitle>Card Title</CardTitle>
              <CardTitle>Card Subtitle</CardTitle>
              <p>
                Some quick example text to build on the card title and make up
                the bulk of the card content.
              </p>
            </CardBody>
            <CardActions>
              <span className="k-button k-flat k-primary">Action 1</span>
              <span className="k-button k-flat k-primary">Action 2</span>
            </CardActions>
          </Card>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('my-app'))
