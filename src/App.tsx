import Space, { ConfigProvider } from './components/Space';

import './App.css';

const App = () => {
  return (
    <ConfigProvider space={{ size: 20 }}>
      <Space direction='horizontal' align='end' split={<p></p>}>
        <div className='box'>1</div>
        <div className='box'>2</div>
        <div className='box'>3</div>
      </Space>
      <Space direction='vertical' align='end' split={<p></p>} wrap>
        <div className='box'>1</div>
        <div className='box'>2</div>
        <div className='box'>3</div>
      </Space>
      <Space className='custom-class' align='start' direction='vertical' style={{ color: 'red' }}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Space>
    </ConfigProvider>
  );
};

export default App;
