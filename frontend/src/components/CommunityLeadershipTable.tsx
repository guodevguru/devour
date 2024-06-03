import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Leadership } from '../interfaces';
import './CommunityLeadershipTable.css';

const CommunityLeadershipTable = () => {
    const { data, isLoading } = useQuery<Leadership[]>({
        queryKey: ['leaderships'],
        queryFn: () => axios.get('http://localhost:8080/leaderships').then(res => res.data)
    });

    if (isLoading) return 'Loading...';

    return (
        <div className="table-wrapper">
            <div className="leadership-header-title">Top Community Leaderboard</div>
            <table>
                <tr>
                  <th>Rank</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Total Experience</th>
                  <th>Number of Users</th>
                </tr>
                {data?.map((item, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td><img className="leadership-logo-image" src={item.logo} /></td>
                        <td>{item.name}</td>
                        <td>{item.totalExperiencePoints}</td>
                        <td>{item.numOfUsers}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default CommunityLeadershipTable;