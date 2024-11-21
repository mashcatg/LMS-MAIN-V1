"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, FileText, EllipsisVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import AddPlaylist from "@/components/admin/AddPlaylist";
export const description = "A playlists dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of playlists in a table with actions.";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const itemsPerPage = 10;
  const router = useRouter();

  const handleEditPlaylist = (playlist) => {
    setEditingPlaylist(playlist); 
  };
  const handleDeletePlaylist = async (playlist_id) => {
    const confirmDelete = confirm("Are you sure you want to delete this playlist?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost/lms-admin/classes/delete_playlist.php?id=${playlist_id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          alert("Playlist deleted successfully!");
          fetchPlaylists(); 
        } else {
          alert("Failed to delete playlist: " + result.message);
        }
      } catch (error) {
        console.error("Error deleting playlist:", error);
        alert("Error deleting playlist");
      }
    }
  };
  const fetchPlaylists = async () => {
    try {
      const response = await fetch("http://localhost/lms-admin/classes/fetch_playlists.php", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPlaylists(data.playlists || []);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
      setError("Error fetching playlists");
    }
  };

  // Fetch playlists from the server
  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleNewPlaylist = () => {
    fetchPlaylists();
  };
  // Pagination logic
  const totalPages = Math.ceil(playlists.length / itemsPerPage);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filter playlists based on the search term
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.playlist_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the playlists for the current page
  const currentPlaylists = filteredPlaylists.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRowClick = (playlist_id) => {
    router.push(`./class/${playlist_id}`);
  };

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
  };
  
  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <Card className="overflow-x-auto">
        {/* Header Section */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <CardTitle>Playlists</CardTitle>
            <CardDescription>Manage and distribute playlists.</CardDescription>
          </div>
          <div className="flex space-x-4">
            <div className="relative w-full">
              <label htmlFor="input-box" className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Search
              </label>
              <input
                id="input-box"
                type="text"
                className="border text-md h-full rounded-md w-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Search playlists..."
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
                <DropdownMenuItem onClick={() => handleExport("PDF")}>PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("CSV")}>CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("Excel")}>Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        {/* Playlists Table */}
        <CardContent className="overflow-auto">
          <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <TableRow className="border-b">
                <TableHead>Playlist Name</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentPlaylists.map((playlist) => (
                <TableRow
                  key={playlist.playlist_id}
                  className="hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <TableCell className="p-4 font-medium text-gray-800">{playlist.playlist_name}</TableCell>
                  <TableCell className="p-4 font-medium text-gray-800">{playlist.course_names}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleRowClick(playlist.playlist_id)}>Manage Classes</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditPlaylist(playlist)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeletePlaylist(playlist.playlist_id)}>Delete</DropdownMenuItem>
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
              {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredPlaylists.length)}
            </strong>{" "}
            of <strong>{filteredPlaylists.length}</strong> rows
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft />
            </Button>

            {currentPage > 1 && (
              <Button variant="secondary" size="icon" onClick={() => handlePageChange(currentPage - 1)}>
                {currentPage - 1}
              </Button>
            )}

            <Button variant="default" size="icon">
              {currentPage}
            </Button>

            {currentPage < totalPages && (
              <Button variant="secondary" size="icon" onClick={() => handlePageChange(currentPage + 1)}>
                {currentPage + 1}
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
      <AddPlaylist onPlaylistAdded={handleNewPlaylist} playlist={editingPlaylist} setEditingPlaylist={setEditingPlaylist} />
    </main>
  );
}