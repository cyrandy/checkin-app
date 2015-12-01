import { expect } from 'chai'
import TestUtils from 'react-addons-test-utils'
import CheckinList from '../src/components/CheckinList'
import CheckinMap from '../src/components/Map'
import CheckinPage from '../src/containers/CheckinPage'

function setup(Component, props) {
  let renderer = TestUtils.createRenderer()
  renderer.render(<Component {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('Components', () => {
  describe('CheckinPage', () => {
    it('should render correctly', () => {
      let { output } = setup(CheckinPage)

      expect(output.type).to.equal('div')
      expect(output.props.className).to.equal('c-checkin-page')

      let [checkinMap, checkinList] = output.props.children

      expect(checkinMap.type.displayName).to.equal('CheckinMap')
      expect(checkinList.type.displayName).to.equal('CheckinList')
    })
  })

  describe('CheckinList', () => {
    it('should render correctly', () => {
      const { output } = setup(CheckinList, {
        markers: [
          {
            position: {
              lat: 25.0258386,
              lng: 121.4682614
            },
            defaultAnimation: 2
          }
        ]
      })

      expect(output.type).to.equal('ul')

      let children = output.props.children

      expect(children.length).to.equal(1)
      expect(children[0].type.displayName).to.equal('CheckinListItem')
    })
  })
})
