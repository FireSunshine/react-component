import Space, { ConfigProvider } from './components/Space';

import './App.css';

const App = () => {
  return (
    <ConfigProvider space={{ size: 200 }}>
      <Space direction='horizontal' split={<p></p>}>
        <div className='box'>1</div>
        <div className='box'>2</div>
        <div className='box'>3</div>
      </Space>

      <Space direction='vertical' split={<p></p>}>
        <div className='box'>1</div>
        <div className='box'>2</div>
        <div className='box'>3</div>
      </Space>
    </ConfigProvider>
  );
};

export default App;
