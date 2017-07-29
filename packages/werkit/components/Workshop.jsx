export default class extends React.Component {
  static concepts({children}) {
    return children.filter(child => child.type.isConcept)
  }
}