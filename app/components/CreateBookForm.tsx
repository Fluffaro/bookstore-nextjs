"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants";


interface BookType {
  id?: number;  // ✅ Make id optional
  title: string;
  author: string;
  price: number;
  description?: string;
  coverImage?: string;
  category?: string;
  featured?: boolean; // ✅ This will be handled in the backend
}


const CreateBookForm = ({ token }: { token: string | null }) => {
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      price: 0,
      description: "",
      coverImage: "",
      category: "",
      featured: false
    },
  });
  const addBook = async (values: Omit<BookType, "id" | "featured">) => {
    if (!token) return alert("You must be logged in to add books!");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          featured: false, // ✅ Always false
        }),
      });

      if (!response.ok) {
        let errorMessage = `❌ Failed to add book: ${response.status}`;

        // ✅ Check if response has JSON content
        const text = await response.text(); // Read raw response text
        if (text) {
          try {
            const errorData = JSON.parse(text);
            errorMessage += "\n" + JSON.stringify(errorData, null, 2);
          } catch (jsonError) {
            console.error("Response is not valid JSON:", text);
          }
        }

        console.error("Validation errors:", errorMessage);
        alert(errorMessage);
        return;
      }

      alert("✅ Book added successfully!");
      form.reset();
      window.location.reload();
    } catch (error) {
      console.error("Error adding book:", error);
      alert("❌ An error occurred while adding the book.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addBook)} className="space-y-4 p-4 w-80 bg-white rounded-lg shadow-md">

          {/* Book Title */}
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Book title" {...field} />
              </FormControl>
            </FormItem>
          )} />

          {/* Author */}
          <FormField control={form.control} name="author" render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter book author" {...field} />
              </FormControl>
            </FormItem>
          )} />

          {/* Price */}
          <FormField control={form.control} name="price" render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter price" {...field} />
              </FormControl>
            </FormItem>
          )} />

          {/* Description */}
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter book description" {...field} />
              </FormControl>
            </FormItem>
          )} />

          {/* Cover Image URL */}
          <FormField control={form.control} name="coverImage" render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter cover image URL" {...field} />
              </FormControl>
            </FormItem>
          )} />

          {/* Category */}
          <FormField control={form.control} name="category" render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter book category" {...field} />
              </FormControl>
            </FormItem>
          )} />

          <Button type="submit" className="w-full">Add Book</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateBookForm;
