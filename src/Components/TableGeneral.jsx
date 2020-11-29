import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import ResponsiveDialog from './ResponsiveDialog';


var data=[];

export default class TableGeneral extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
	datagrid:[],
	longData: null
  };







async llenargrid()
{

  try{

    

 await axios.get('https://restcountries-v1.p.rapidapi.com/all',{
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "920dcd0ff9msh216821ea0112939p19b9b7jsncc12f40be6f4",
		"x-rapidapi-host": "restcountries-v1.p.rapidapi.com"
	}
})
      .then(res => {
        this.setState({
           datagrid: res.data,
           longData: res.data.length
         });

//console.log(this.state.datagrid);

const {longData ,datagrid}=this.state;
data=[];

for (var i = 0; i < longData; i++) {
	
	
	var opcion=(<ResponsiveDialog code={datagrid[i].alpha2Code} namepais={datagrid[i].name} />);

data.push(
{
  key: datagrid[i].alpha2Code,
  nombre: datagrid[i].name,
  alfacode: datagrid[i].alpha2Code,
  capital: datagrid[i].capital,
  region: datagrid[i].region,
  subregion: datagrid[i].subregion,
  poblacion: datagrid[i].population,
  ficha: opcion
});

}
console.log(data);

//console.log(datagrid);

      });
}
catch(err)
{
  console.error(err);
}
         
}






componentDidMount() {
  try{

   for(let i=0; i<2; i++)
   {
this.llenargrid();
   }


    
  }catch(err){
    console.error('#ERROR Error en willMount de la pagina de formularios: ' + err);
  }
}






  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        width: '30%',
        ...this.getColumnSearchProps('nombre'),
      },
      {
        title: 'Codigo',
        dataIndex: 'alfacode',
	  key: 'alfacode',
        width: '20%',
        ...this.getColumnSearchProps('alfacode'),
      },
      {
        title: 'Region',
        dataIndex: 'region',
        key: 'capital',
        ...this.getColumnSearchProps('region'),
      },
      {
        title: 'Subregion',
        dataIndex: 'subregion',
        key: 'subregion',
        ...this.getColumnSearchProps('subregion'),
      },
      {
        title: 'Población',
        dataIndex: 'poblacion',
        key: 'poblacion',
        ...this.getColumnSearchProps('poblacion'),
      },
	        {
        title: 'Ficha',
        dataIndex: 'ficha',
        key: 'ficha',
      },
    ];
	

	
	
	
	
    return <Table columns={columns} dataSource={data} />;
  }
}
