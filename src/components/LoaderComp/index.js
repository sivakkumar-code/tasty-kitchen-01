import Loader from 'react-loader-spinner'

const LoaderComp = props => {
  const {test} = props

  return (
    <div className="loader-container" testid={test}>
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )
}

export default LoaderComp
