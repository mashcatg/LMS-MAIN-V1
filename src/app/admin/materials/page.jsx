"use client";



import React, { useEffect, useState } from "react";

import Link from "next/link";

import {

  ChevronDown,

  ChevronLeft,

  ChevronRight,

  EllipsisVertical,

  FileText,

} from "lucide-react";

import { Button } from "@/components/ui/button";

import {

  Card,

  CardContent,

  CardDescription,

  CardFooter,

  CardHeader,

  CardTitle,

} from "@/components/ui/card";

import {

  DropdownMenu,

  DropdownMenuContent,

  DropdownMenuItem,

  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";

import {

  Table,

  TableBody,

  TableCell,

  TableHead,

  TableHeader,

  TableRow,

} from "@/components/ui/table";

import AddMaterial from "@/components/admin/AddMaterial";



export default function Materials() {

  const [materials, setMaterials] = useState([]);

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const [editingMaterial, setEditingMaterial] = useState(null);

  const itemsPerPage = 10;



  const fetchMaterials = async () => {

    try {

      const response = await fetch(

        "http://localhost/lms-admin/materials/fetch_materials.php",

        {

          method: "GET",

          credentials: "include",

        }

      );

      const data = await response.json();

      if (data.error) {

        setError(data.error);

      } else {

        setMaterials(data.materials || []);

      }

    } catch (error) {

      console.error("Error fetching materials:", error);

      setError("Error fetching materials");

    }

  };



  useEffect(() => {

    fetchMaterials();

  }, []);



  const handleMaterialAdded = (newMaterial) => {

    setMaterials([...materials, newMaterial]);

  };



  const handleMaterialEdited = (updatedMaterial) => {

    setMaterials(materials.map(material => 

      material.material_id === updatedMaterial.material_id ? updatedMaterial : material

    ));

    setEditingMaterial(null);

  };



  const handleDeleteMaterial = async (materialId) => {

    if (confirm("Are you sure you want to delete this material?")) {

      try {

        const response = await fetch(

          `http://localhost/lms-admin/materials/delete_material.php?material_id=${materialId}`,

          {

            method: "DELETE",

            credentials: "include",

          }

        );

        const data = await response.json();

        if (data.success) {

          alert("Material deleted successfully!");

          fetchMaterials();

        } else {

          alert(`Error: ${data.message || "Failed to delete material"}`);

        }

      } catch (error) {

        console.error("Error deleting material:", error);

        alert("Error deleting material");

      }

    }

  };



  const [totalPages, setTotalPages] = useState(1);



  const handlePageChange = (page) => {

    if (page >= 1 && page <= totalPages) {

      setCurrentPage(page);

    }

  };



  // Filter materials based on the search term

  const filteredMaterials = materials.filter(

    (material) =>

      material.material_name.toLowerCase().includes(searchTerm.toLowerCase()) ||

      material.material_number

        .toLowerCase()

        .includes(searchTerm.toLowerCase()) ||

      material.material_institution

        .toLowerCase()

        .includes(searchTerm.toLowerCase())

  );



  // Get the products for the current page

  const currentMaterials = filteredMaterials.slice(

    (currentPage - 1) * itemsPerPage,

    currentPage * itemsPerPage

  );



  return (

    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">

      <Card className="overflow-x-auto">

        {/* Header Section */}

        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">

          <div>

            <CardTitle>Materials</CardTitle>

            <CardDescription>

              Add your materials and edit them as needed.

            </CardDescription>

          </div>

          <div className="flex space-x-4">

            <div class="relative w-full ">

              <label

                for="input-box"

                class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600"

              >

                Search

              </label>

              <input

                id="input-box"

                type="text"

                class="border text-md h-full rounded-md w-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"

                placeholder="Type something..."

                value={searchTerm}

                onChange={(e) => setSearchTerm(e.target.value)}

              />

            </div>



            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <Button variant="default">

                  <FileText className="mr-2 w-4 h-4" />

                  Export <ChevronDown className="ml-2 w-4 h-4" />

                </Button>

              </DropdownMenuTrigger>

              <DropdownMenuContent>

                <DropdownMenuItem onClick={() => handleExport("Print")}>

                  Print

                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleExport("CSV")}>

                  CSV

                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleExport("Excel")}>

                  Excel

                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          </div>

        </CardHeader>



        {/* Product Table */}

        <CardContent className="overflow-auto">

          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">

            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">

              <TableRow className="border-b">

                <TableHead className="p-4">Material Name</TableHead>

                <TableHead>Course</TableHead>

                <TableHead className="text-right">

                  <span className="sr-only">Actions</span>

                </TableHead>

              </TableRow>

            </TableHeader>



            <TableBody>

              {currentMaterials.map((material, index) => (

                <TableRow

                  key={index}

                  className="hover:bg-gray-100 transition duration-200 ease-in-out"

                >

                  <TableCell className="p-4 font-medium text-gray-800">

                    {material.material_name}

                  </TableCell>

                  <TableCell className="p-4 font-medium text-gray-800">

                    {material.course_name}

                  </TableCell>

                  <TableCell className="p-4 text-right">

                    <DropdownMenu>

                      <DropdownMenuTrigger asChild>

                        <button

                          type="button"

                          className="inline-flex justify-center rounded-md border p-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"

                        >

                          <span className="sr-only">Open options</span>

                          <EllipsisVertical className="h-4 w-4" />

                        </button>

                      </DropdownMenuTrigger>

                      <DropdownMenuContent>

                        <Link

                          href={`/admin/materials/${material.material_id}`}

                        >

                          <DropdownMenuItem>View</DropdownMenuItem>

                        </Link>

                        <DropdownMenuItem onClick={() => setEditingMaterial(material)}>Edit</DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handleDeleteMaterial(material.material_id)}>Delete</DropdownMenuItem>

                      </DropdownMenuContent>

                    </DropdownMenu>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </CardContent>



        {/* Pagination */}

        <CardFooter className="flex justify-between items-center">

          <div className="text-xs text-muted-foreground">

            Showing{" "}

            <strong>

              {(currentPage - 1) * itemsPerPage + 1}-

              {Math.min(currentPage * itemsPerPage, materials.length)}

            </strong>{" "}

            of <strong>{materials.length}</strong> rows

          </div>



          {/* Pagination Controls */}

          <div className="flex items-center space-x-2">

            <Button

              variant="secondary"

              size="icon"

              disabled={currentPage === 1}

              onClick={() => handlePageChange(currentPage - 1)}

            >

              <ChevronLeft />

            </Button>



            {currentPage > 2 && (

              <Button

                variant="secondary"

                size="icon"

                onClick={() => handlePageChange(1)}

              >

                1

              </Button>

            )}

            {currentPage > 3 && (

              <Button

                variant="secondary"

                size="icon"

                onClick={() => handlePageChange(1)}

                disabled

              >

                ...

              </Button>

            )}



            {currentPage > 1 && (

              <Button

                variant="secondary"

                size="icon"

                onClick={() => handlePageChange(currentPage - 1)}

              >

                {currentPage - 1}

              </Button>

            )}



            <Button variant="default" size="icon">

              {currentPage}

            </Button>



            {currentPage < totalPages && (

              <Button

                variant="secondary"

                size="icon"

                onClick={() => handlePageChange(currentPage + 1)}

              >

                {currentPage + 1}

              </Button>

            )}

            {currentPage + 2 < totalPages && (

              <Button

                variant="secondary"

                size="icon"

                onClick={() => handlePageChange(totalPages)}

              >

                ...

              </Button>

            )}

            {currentPage + 1 < totalPages && (

              <Button

                variant="secondary"

                size="icon"

                onClick={() => handlePageChange(totalPages)}

              >

                {totalPages}

              </Button>

            )}



            <Button

              variant="secondary"

              size="icon"

              disabled={currentPage === totalPages}

              onClick={() => handlePageChange(currentPage + 1)}

            >

              <ChevronRight />

            </Button>

          </div>

        </CardFooter>

      </Card>

      <AddMaterial

        material={editingMaterial}

        onMaterialAdded={handleMaterialAdded}

        onMaterialEdited={handleMaterialEdited}

        onClose={() => setEditingMaterial(null)}

      />

    </main>

  );

}


