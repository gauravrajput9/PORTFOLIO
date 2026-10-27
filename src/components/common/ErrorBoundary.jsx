import { Component } from 'react'

export default class ErrorBoundary extends Component{
  constructor(props){super(props);this.state={hasError:false}}
  static getDerivedStateFromError(){return {hasError:true}}
  componentDidCatch(error){console.error('Portfolio render error',error)}
  render(){if(this.state.hasError)return <main className="not-found section"><p className="eyebrow">Unexpected error</p><h1>Something<br/><span>went wrong.</span></h1><button className="button primary" onClick={()=>this.setState({hasError:false})}>Try again</button></main>;return this.props.children}
}
