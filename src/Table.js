import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ list: nextProps.items })
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
            list: sortedUsers
        });
    };

    render() {

        return (
            this.state.list.length > 0 && (
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
                            <tr id={p.Rank}>
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
            )
        );
    }

}

export default Table;