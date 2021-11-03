import React, { /*lazy,*/ Suspense } from 'react'
import { Card, Spin } from 'antd'

// const AreaChart = lazy(() => import('../chart/AreaChart'))

interface ProfitCardProps {
  mainTitle: string
  paragraph: string
  amount: string
  data: any
  loading: boolean
}

const ProfitCard: React.FC<ProfitCardProps> = ({
  mainTitle,
  paragraph,
  amount,
  data,
  loading
}) => {
  return (
    <Card>
      <React.Fragment>
        {loading ? (
          <div className="profit-card-spinner">
            <Spin size="small" />
          </div>
        ) : (
          <>
            <div className="profit-card">
              <h4>{mainTitle}</h4>
              <p>{paragraph}</p>
              <h1>{amount}</h1>
            </div>
            <div>
              <Suspense
                fallback={
                  <div className="profit-card-spinner">
                    <Spin size="small" />
                  </div>
                }
              >
                {/* <AreaChart info={data} /> */}
              </Suspense>
            </div>
          </>
        )}
      </React.Fragment>
    </Card>
  )
}

export default ProfitCard
