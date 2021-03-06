toc.dat                                                                                             0000600 0004000 0002000 00000010025 13571251157 0014444 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       #                    w            EcomDB    12.0    12.0     "           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         #           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         $           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         %           1262    16393    EcomDB    DATABASE     �   CREATE DATABASE "EcomDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE "EcomDB";
                postgres    false         �            1259    16438 	   Dienthoai    TABLE     �   CREATE TABLE public."Dienthoai" (
    id text NOT NULL,
    ten text,
    gia integer,
    mota text,
    anh text,
    brand text,
    document_vectors tsvector
);
    DROP TABLE public."Dienthoai";
       public         heap    postgres    false         �            1259    16416    Laptop    TABLE     �   CREATE TABLE public."Laptop" (
    id text NOT NULL,
    ten text,
    gia integer,
    mota text,
    anh text,
    brand text,
    document_vectors tsvector
);
    DROP TABLE public."Laptop";
       public         heap    postgres    false         �            1259    16430    Tivi    TABLE     �   CREATE TABLE public."Tivi" (
    id text NOT NULL,
    ten text,
    gia integer,
    mota text,
    anh text,
    brand text,
    document_vectors tsvector
);
    DROP TABLE public."Tivi";
       public         heap    postgres    false         �            1259    16611    Users    TABLE     �   CREATE TABLE public."Users" (
    username text NOT NULL,
    password text NOT NULL,
    fullname text,
    birthday date,
    address text,
    phone numeric,
    email text
);
    DROP TABLE public."Users";
       public         heap    postgres    false         �
           2606    16445    Dienthoai Dienthoai_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Dienthoai"
    ADD CONSTRAINT "Dienthoai_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Dienthoai" DROP CONSTRAINT "Dienthoai_pkey";
       public            postgres    false    214         �
           2606    16423    Laptop Laptop_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Laptop"
    ADD CONSTRAINT "Laptop_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Laptop" DROP CONSTRAINT "Laptop_pkey";
       public            postgres    false    212         �
           2606    16437    Tivi Tivi_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Tivi"
    ADD CONSTRAINT "Tivi_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Tivi" DROP CONSTRAINT "Tivi_pkey";
       public            postgres    false    213         �
           2606    16618    Users Users_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (username, password);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    215    215         �
           1259    16447    idx_fts_doc_vec    INDEX     Q   CREATE INDEX idx_fts_doc_vec ON public."Dienthoai" USING gin (document_vectors);
 #   DROP INDEX public.idx_fts_doc_vec;
       public            postgres    false    214         �
           1259    16448    idx_fts_doc_vec_2    INDEX     P   CREATE INDEX idx_fts_doc_vec_2 ON public."Laptop" USING gin (document_vectors);
 %   DROP INDEX public.idx_fts_doc_vec_2;
       public            postgres    false    212         �
           1259    16449    idx_fts_doc_vec_3    INDEX     N   CREATE INDEX idx_fts_doc_vec_3 ON public."Tivi" USING gin (document_vectors);
 %   DROP INDEX public.idx_fts_doc_vec_3;
       public            postgres    false    213                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   restore.sql                                                                                         0000600 0004000 0002000 00000007157 13571251157 0015405 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "EcomDB";
--
-- Name: EcomDB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "EcomDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


ALTER DATABASE "EcomDB" OWNER TO postgres;

\connect "EcomDB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Dienthoai; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Dienthoai" (
    id text NOT NULL,
    ten text,
    gia integer,
    mota text,
    anh text,
    brand text,
    document_vectors tsvector
);


ALTER TABLE public."Dienthoai" OWNER TO postgres;

--
-- Name: Laptop; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Laptop" (
    id text NOT NULL,
    ten text,
    gia integer,
    mota text,
    anh text,
    brand text,
    document_vectors tsvector
);


ALTER TABLE public."Laptop" OWNER TO postgres;

--
-- Name: Tivi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tivi" (
    id text NOT NULL,
    ten text,
    gia integer,
    mota text,
    anh text,
    brand text,
    document_vectors tsvector
);


ALTER TABLE public."Tivi" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    username text NOT NULL,
    password text NOT NULL,
    fullname text,
    birthday date,
    address text,
    phone numeric,
    email text
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Dienthoai Dienthoai_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dienthoai"
    ADD CONSTRAINT "Dienthoai_pkey" PRIMARY KEY (id);


--
-- Name: Laptop Laptop_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Laptop"
    ADD CONSTRAINT "Laptop_pkey" PRIMARY KEY (id);


--
-- Name: Tivi Tivi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tivi"
    ADD CONSTRAINT "Tivi_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (username, password);


--
-- Name: idx_fts_doc_vec; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_fts_doc_vec ON public."Dienthoai" USING gin (document_vectors);


--
-- Name: idx_fts_doc_vec_2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_fts_doc_vec_2 ON public."Laptop" USING gin (document_vectors);


--
-- Name: idx_fts_doc_vec_3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_fts_doc_vec_3 ON public."Tivi" USING gin (document_vectors);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 