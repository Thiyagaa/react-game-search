import React from "react";
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            sortedField:''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(!_.isEqual(nextProps.items,prevState.list) && !prevState.sortedField){
            return {
                list: nextProps.items,
                sortedField:prevState.sortedField
              };
        } else if(!_.isEqual(nextProps.items,prevState.list) && prevState.sortedField){
            return {
                list: prevState.list,
                sortedField:''
              };
        }else{
            return null;
        }
    }
    onSortChange(cName) {
        const listCopy = [...this.state.list]
        const sortedUsers = listCopy.sort((a, b) => {
            let nameA = '';
            let nameB = '';
            if (typeof a[cName] === 'number' || typeof b[cName] === 'number') {
                nameA = a[cName]
                nameB = b[cName]
            } else {
                nameA = a[cName].toUpperCase()
                nameB = b[cName].toUpperCase()
            }
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            else return 0
        })
        this.setState({
            list: sortedUsers,
            sortedField: cName
        });
    };

    render() {

        return (    
            this.state.list && this.state.list.length > 0 ?  (
                <table className='text-left'>
                    <thead>
                        <tr>
                            <th>Rank
                            <FontAwesomeIcon icon={faCaretSquareDown} onClick={() => this.onSortChange("Rank")} />

                            </th>
                            <th>
                                Name
                                <FontAwesomeIcon icon={faCaretSquareDown} onClick={() => this.onSortChange("Name")} />
                            </th>
                            <th>
                                Platform
                                <FontAwesomeIcon icon={faCaretSquareDown} onClick={() => this.onSortChange("Platform")} />
                            </th>
                            <th>
                                Year
                                <FontAwesomeIcon icon={faCaretSquareDown} onClick={() => this.onSortChange("Year")} />
                            </th>
                            <th>
                                Genre
								<FontAwesomeIcon icon={faCaretSquareDown} onClick={() => this.onSortChange("Genre")} />
                            </th>
                            <th>
                                Publisher
                                <FontAwesomeIcon icon={faCaretSquareDown} onClick={() => this.onSortChange("Publisher")} />
                            </th>
                            <th>
                                Global_Sales
								<FontAwesomeIcon icon={faCaretSquareDown} onClick={() => this.onSortChange("Global_Sales")} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list.map(p => (
                            <tr key={p.Rank}>
                                <td>{p.Rank}</td>
                                <td>{p.Name}</td>
                                <td>{p.Platform}</td>
                                <td>{p.Year}</td>
                                <td>{p.Genre}</td>
                                <td>{p.Publisher}</td>
                                <td>{p.Global_Sales}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ):(<table className='text-left'></table>)
        )
    }

}

export default Table;