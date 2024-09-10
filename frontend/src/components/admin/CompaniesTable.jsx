import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                     { 
                          filterCompany?.map((company) => ( 
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                        <AvatarImage src={ "data:image/jpeg;base64,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"}/>
                                    </Avatar>
                                </TableCell>
                                 <TableCell>{company.name}</TableCell>
                                 <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                            
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                             </tr>

                         )
                     )
                     } 
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable